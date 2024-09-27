import React from 'react';
import './globals.css'; // Falls du Tailwind oder globales CSS verwendest

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <html lang="en">
      <body>
      <main>
        {children} {/* Hier wird die Seite gerendert */}
      </main>
      </body>
      </html>
  );
};

export default RootLayout;
