import React from 'react';

const AddAccounting = () => {
    return (
        <div>
              <div>
              <h2 className="text-2xl text-[#5E5E5E] font-semibold">Add Accounting</h2>
              <form className="mt-5 space-y-6">
                {/* Choose Date */}
                <div>
                  <input
                    type="date"
                    className="w-[248px] text-[#979797] mt-2 p-3 border  bg-white"
                  />
                </div>
  
                {/* Account Type Dropdown */}
                <div>
                  <select
                    className="w-[248px] text-[#979797] mt-2 p-3  bg-white"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="savings">Savings</option>
                    <option value="loan">Loan</option>
                  </select>
                </div>
  
                {/* Choose Head Dropdown */}
                <div>
                  <select
                    className="w-[248px] text-[#979797] mt-2 p-3 bg-white"
                  >
                    <option value="head1">Head 1</option>
                    <option value="head2">Head 2</option>
                    <option value="head3">Head 3</option>
                    <option value="head4">Head 4</option>
                  </select>
                </div>
  
                {/* Amount Field */}
                <div>
                  <input
                    type="number"
                    className="w-[248px] mt-2 p-3 bg-white"
                    placeholder="Enter Amount"
                  />
                </div>
  
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-[248px] py-3 bg-primaryBg text-white "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
        </div>
    );
};

export default AddAccounting;