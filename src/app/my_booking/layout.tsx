import { ReactNode } from "react";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {

  const cookieStore = await cookies();

  const user = {
    id: cookieStore.get("id")?.value,
    name: cookieStore.get("name")?.value,
    email: cookieStore.get("email")?.value,
    role: cookieStore.get("role")?.value,
  };


  return (
    <main className="min-h-screen bg-gray-50 p-6 dark:bg-slate-950">

      <div className="mx-auto w-full max-w-7xl rounded-xl bg-white p-6 shadow dark:bg-slate-900">


        {/* User Information */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-slate-800">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">


            <div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Welcome, {user.name || "User"}
              </h2>


              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {user.email || "No email"}
              </p>


            </div>



            <div className="flex flex-col items-start sm:items-end">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {user.role || "user"}
              </span>


              <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                ID: {user.id || "-"}
              </span>


            </div>


          </div>


        </div>


        {children}


      </div>


    </main>
  );
}