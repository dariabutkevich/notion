import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header> </header>
      <main>
        <Outlet />
      </main>
      <footer className="flex flex-col items-center w-full my-4 fixed bottom-0 bg-white">
        <div className="flex gap-8 ml-2">
          <div>Created by: Butkevich Darya</div>
          <div className="ml-auto">BSU: 2023</div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
