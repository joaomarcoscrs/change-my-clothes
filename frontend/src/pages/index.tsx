import DefaultLayout from "@/layouts/default";
import DesktopApp from "@/components/DesktopApp";
import MobileApp from "@/components/MobileApp";
import useIsMobile from "@/hooks/useIsMobile";

export default function IndexPage() {
  const isMobile = useIsMobile();

  return (
    <DefaultLayout>{isMobile ? <MobileApp /> : <DesktopApp />}</DefaultLayout>
  );
}
