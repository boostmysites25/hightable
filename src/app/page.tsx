import HomeNav from '@/components/home/HomeNav';
import HomeHero from '@/components/home/HomeHero';
import HomeAbout from '@/components/home/HomeAbout';
import HomeApplication from '@/components/home/HomeApplication';
import HomeMembers from '@/components/home/HomeMembers';

export default function HomePage() {
    return (
        <div className="bg-[#3D0066] min-h-screen text-[#EFD9F7]">
            <HomeNav />
            <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
                <HomeHero />
            </main>
        </div>
    );
}
