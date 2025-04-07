"use client";
const LoginTypeSelector = ({ setLoginType }) => (
  <div className="flex flex-col items-center justify-center bg-[#FBF9FA]  gap-6">
    <button
      onClick={() => setLoginType("user")}
      className="hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
    >
      <img
        src="/images/user-icon.png"
        width={180}
        height={180}
        alt="User Icon"
        className="hover:shadow-lg rounded-lg"
      />
    </button>
    <button
      onClick={() => setLoginType("vendor")}
      className="hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
    >
      <img
        src="/images/vendor-icon.png"
        width={150}
        height={150}
        alt="Vendor Icon"
        className="hover:shadow-lg rounded-lg"
      />
    </button>
  </div>
);
export default LoginTypeSelector;
