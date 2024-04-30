import React from "react"
import "@/styles/globals.css"
import RecoilRootWrapper from "@/wrappers/RecoilRootWrapper"
import QueryClientProviderWrapper from "@/wrappers/QueryClientProviderWrapper"
import Toast from "@/components/toast/Toast"
import ModalList from "@/components/modal/ModalList"

export const metadata = {
  title: "Fitness | Behind",
  description: "당신만을 위한 비하인드 운동 관리 프로젝트",
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [{ url: "/favicons/favicon-32x32.png" }, { url: "/favicons/favicon-16x16.png" }],
    shortcut: ["/shortcut-icon.png"],
    apple: [{ url: "/favicons/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicons/safari-pinned-tab.svg",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center">
        <QueryClientProviderWrapper>
          <RecoilRootWrapper>
            {children}
            <Toast />
            <ModalList />
          </RecoilRootWrapper>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
