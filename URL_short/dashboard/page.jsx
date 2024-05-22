import UrlList from "@/components/UrlList";
import UrlShortner from "@/components/UrlShortner";

export default function Dashboard() {
  return (
    <div>
      <UrlShortner />;
      <UrlList />
    </div>
  );
}
