import React from 'react';
// import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import ReduxProvider from '@/lib/ReduxProvider';
import './globals.css';
import ProcessingComponent from '@/app/components/ProcessingComponent';
import { ThemeProvider } from '@/lib/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import LayoutLoading from '@/app/components/LayoutLoading';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="text-blueGray-700 antialiased">
        {/* Setup Redux Provider */}
        <ReduxProvider>
          {/* Check Auth Provider */}
          <ProcessingComponent>
            {/* Setup Dark/Light theme Provider */}
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* Setup shade/ui Provider */}
              <TooltipProvider>
                {/* Setup antd Provider */}
                <StyledComponentsRegistry>
                  <Toaster />
                  <LayoutLoading>{children}</LayoutLoading>
                </StyledComponentsRegistry>
              </TooltipProvider>
            </ThemeProvider>
          </ProcessingComponent>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
