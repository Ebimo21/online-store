import { CartProvider } from "@/hooks/cartProvider"

export const metadata = {
  title: 'Online Store',
  description: 'Online Store Platform',
}

export default function RootLayout( { children } : { children: React.ReactNode } ) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}
