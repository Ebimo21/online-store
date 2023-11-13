import { AuthProvider } from "@/hooks/authProvider"
import { CartProvider } from "@/hooks/cartProvider"

export default function RootLayout( { children } : { children: React.ReactNode } ) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  )
}
