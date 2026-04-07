export const metadata = {
  title: "Dashboard - The Digital Curator",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      <div className="container-custom pt-12">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
