import React, { useEffect, useState, useRef } from 'react';

const DeviceIntegration = () => {
  const [dataReceived, setDataReceived] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const logRef = useRef(null);
  const serviceUUID = "331a36f5-2459-45ea-9d95-6142f0c4b307";
  const charactReadUUID = "a73e9a10-628f-4494-a099-12efaf72258f";
  const charactWriteUUID = "a9da6040-0823-4995-94ec-9ce41ca28833";
  const encoder = new TextEncoder('utf-8');

  useEffect(() => {
    const handleError = (error) => {
      console.error(error);
      setLogStatus(`${error.message} (Your browser may not support this feature.)`);
    };

    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  const startScan = async () => {
    try {
      const bluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: "BX3" }],
        optionalServices: [serviceUUID],
      });
      await connect(bluetoothDevice);
    } catch (error) {
      log(`Error: ${error}`);
    }
  };

  const connect = async (bluetoothDevice) => {
    try {
      log('Connecting to GATT Server...');
      const server = await bluetoothDevice.gatt.connect();
      const service = await server.getPrimaryService(serviceUUID);
      const characteristics = await service.getCharacteristics();
      await readData(characteristics);
    } catch (error) {
      log(`Error: ${error}`);
    }
  };

  const readData = async (characteristics) => {
    let charactRead = null;
    let charactWrite = null;

    characteristics.forEach((c) => {
      if (c.uuid === charactWriteUUID) {
        charactWrite = c;
      } else if (c.uuid === charactReadUUID) {
        charactRead = c;
      }
    });

    await charactWrite.startNotifications();
    await charactRead.startNotifications();
    charactRead.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
    await charactWrite.writeValueWithResponse(encoder.encode("listmeasures\r\n"));
  };

  const handleCharacteristicValueChanged = (event) => {
    const value = bytesToString(event.target.value);
    if (!dataReceived.length) {
      setDataReceived(value);
    } else {
      setDataReceived(prev => prev + value);
    }

    if (isJsonString(dataReceived)) {
      try {
        const jsonData = JSON.parse(dataReceived);
        setMeasurements(jsonData.msr);
        log(JSON.stringify(jsonData));
      } catch (error) {
        log(`Parsing error: ${error}`);
      }
    }
  };

  const bytesToString = (val) => {
    return String.fromCharCode.apply(null, new Uint8Array(val.buffer));
  };

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const log = (message) => {
    if (logRef.current) {
      logRef.current.textContent += message + '\n';
    }
  };

  const handleSync = (event) => {
    event.preventDefault();
    if (navigator.bluetooth) {
      log('');
      startScan();
    } else {
      log('Web Bluetooth API is not available.');
    }
  };

  return (
    <div className='bg-white h-screen '>
      <img className="pageIcon" src="icon.png" alt="BX3 Icon" />
      <h1>BX3 / WEB SYNCHRONIZATION</h1>
      <button className="button" id="sync" onClick={handleSync}>Synchronise</button>
      <h3>Live Output</h3>
      <div id="output" className="output">
        <pre ref={logRef}></pre>
      </div>
    </div>
  );
};

export default DeviceIntegration;
