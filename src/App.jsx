import { useState } from 'react';
import './App.css';
import Form from './Form';
import Download from '../Download';

function App() {

const [items, setItems] = useState([
    { description: "", quantity: 0, price: 0, amount: 0 }
  ]);
  
  const [tax, setTax] = useState(0);
  const [invoiceNum, setInvoiceNum] = useState("");
const [invoiceDate, setInvoiceDate] = useState("");


  return (
    <div className='w-full bg-black'>
        <div className="min-h-screen bg-white py-8 px-4 max-w-6xl mx-auto">
            <div className='h-auto w-full my-12 bg-white shadow-md p-5'>
                <h1 className="text-4xl font-semibold text-center mb-6 uppercase bg-gray-200 rounded py-2">
                  Invoice
                </h1>
                <div className='flex flex-col lg:flex-row gap-4'>
                  <Form items={items} setItems={setItems}
                        tax={tax} setTax={setTax}
                        invoiceNum={invoiceNum} setInvoiceNum={setInvoiceNum}
                        invoiceDate={invoiceDate} setInvoiceDate={setInvoiceDate}
                      />
                  <Download items={items}
                              tax={tax}
                              invoiceNum={invoiceNum}
                              invoiceDate={invoiceDate}
                     />
                  </div>
            </div>
        </div>
    </div>
  );
}

export default App;
