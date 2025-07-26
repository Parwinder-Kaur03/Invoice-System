import React, { useEffect, useState } from "react";


const Form = ({ items, setItems, tax, setTax, invoiceNum, setInvoiceNum, invoiceDate, setInvoiceDate }) => {
const [name , setName] =useState("")
const [address , setAddress] =useState("")


const handleItemChange = (index, field, value) => {
  const updatedItems = [...items];
  updatedItems[index][field] = value;

  if (field === "quantity" || field === "price") {
    const qty = parseFloat(updatedItems[index].quantity) || 0;
    const prc = parseFloat(updatedItems[index].price) || 0;
    updatedItems[index].amount = qty * prc;
  }

  setItems(updatedItems);
};


const handleAddItem = () => {
  setItems([
    ...items,
    { description: "", quantity: 0, price: 0, amount: 0 },
  ]);
};

  return (
        <>
          <div className="h-full w-full lg:w-2/3 p-1">
            <h3 className="text-2xl font-semibold">Bill To</h3>
            <input type="text"
            value={name}
            placeholder="Customer Name"
            className="w-full border-2 border-gray-300 rounded px-1 py-1.5 my-1 focus:outline-none"
            onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <input type="text"
            placeholder="Address"
            value={address}
            className="w-full border-2 border-gray-300 rounded px-1 py-1.5 my-1 focus:outline-none"
            onChange={(e)=>setAddress(e.target.value)}
             />
            <div className="w-full grid grid-cols-2 gap-2 my-2">
              <label className="font-semibold">Invoice Number
               <input type="number"
               value={invoiceNum}
            className="w-full border-2 border-gray-300 rounded px-1 py-1.5 my-1 focus:outline-none"
             onChange={(e)=>setInvoiceNum(e.target.value)}
            />
            </label>
              <label className="font-semibold">Date
               <input type="Date"
               value={invoiceDate}
            className="w-full border-2 border-gray-300 rounded px-1 py-1.5 my-1 focus:outline-none"
             onChange={(e)=>setInvoiceDate(e.target.value)}
            />
            </label>
            <label className="font-semibold">Tax (%)
  <input
    type="number"
    value={tax}
    onChange={(e) => setTax(e.target.value)}
    className="w-full border-2 border-gray-300 rounded px-1 py-1.5 my-1 focus:outline-none"
  />
</label>

            </div>
            <div>
              <h3 className="text-xl">Item</h3>
              <div className="w-full overflow-x-auto">
              <table className="min-w-full border border-collapse my-2">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="font-semibold border-2 border-gray-200 px-4 py-2">Description</th>
                    <th className="font-semibold border-2 border-gray-200 px-4 py-2">Quantity</th>
                    <th className="font-semibold border-2 border-gray-200 px-4 py-2">Price</th>
                    <th className="font-semibold border-2 border-gray-200 px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                   {items.map((item, index) => (
                        <tr key={index}>
                         <td className="border-2 border-gray-200 px-4 py-1"><input
                              value={item.description}
                              onChange={(e) => handleItemChange(index, "description", e.target.value)}
                              className="w-full focus:outline-none"
                            /></td>

                            <td className="border-2 border-gray-200 px-4 py-1"><input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                              className="w-full focus:outline-none"
                            /></td>

                            <td className="border-2 border-gray-200 px-4 py-1"><input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleItemChange(index, "price", e.target.value)}
                              className="w-full focus:outline-none"
                            /></td>
                            <td className="border-2 border-gray-200 px-4 py-1">
                              <input
                                value={item.amount}
                                readOnly
                                className="w-full bg-gray-100 focus:outline-none"
                              />
                            </td>
                        </tr>
                      ))}
                  <tr>
                    <td className="font-semibold border-2 border-gray-200 px-4 py-1 text-end" colSpan={3}><button onClick={handleAddItem}>Add Items</button></td>
                    <td className="border-2 border-gray-200 px-4 py-1">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>

        </>
  )
}

export default Form ;