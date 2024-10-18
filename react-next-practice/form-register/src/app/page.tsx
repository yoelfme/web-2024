// import { Button } from "@/components/ui/button"

import { RegisterForm } from "@/components/forms/RegisterForm";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-3/4 max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  )
}
