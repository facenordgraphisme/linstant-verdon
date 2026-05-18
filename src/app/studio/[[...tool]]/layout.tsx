export const metadata = {
  title: "L'instant Verdon Studio",
  description: 'Sanity Studio for L\'instant Verdon',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
