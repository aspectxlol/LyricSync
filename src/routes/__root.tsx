import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      {/**
       * this fucking son of a bitch 
       * was the thing that didnt allow shit to render 
       * all this fucking time, 
       * im about to kill everyone around me 
       * */}
      <Outlet />
    </>
  )
}