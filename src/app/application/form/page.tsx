import ApplicationForm from '@/components/home/ApplicationForm';
import HomeNav from '@/components/home/HomeNav';
import { Suspense } from 'react';

export default function ApplicationFormPage() {
    return (
        <main>
            <HomeNav />
            <Suspense fallback={<div>Loading...</div>}>
                <ApplicationForm />
            </Suspense>
        </main>
    );
}
