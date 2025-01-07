import AccountsHead from "../components/AccountsHead";
import AddAccounting from "../components/AddAccounting";

const AccountingPage = () => {
  return (
    <div>
      <div className="flex  w-[742px]   mx-auto container bg-[#F4F4F4]">
        <div className="p-16 flex  w-full items-start justify-between">
          {/* Add Accounting Div */}
          <div className="flex w-full  justify-between">
            {/* Add Accounting Div */}
            <div className="">
              <AddAccounting />
            </div>

            {/* Vertical Line */}
            <div className="flex items-center">
              <div className="border-r-2 border-[#E0E0E0] h-full"></div>
            </div>

            {/* Accounts Head Div */}
            <div className="">
              <AccountsHead />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingPage;
