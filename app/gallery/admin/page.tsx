import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin-auth";
import { getGalleryPhotos } from "@/lib/photo-store";
import { AdminGallery } from "./AdminGallery";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Album admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdmin();

  return (
    <main className="min-h-screen bg-teal-dark px-4 sm:px-6 py-14">
      <div className="max-w-6xl mx-auto">
        {authed ? (
          <>
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl text-ivory">Album admin</h1>
              <p className="font-body text-ivory/50 text-sm mt-2">
                Hover a photo to delete. Prune junk, then download everything.
              </p>
            </div>
            <AdminGallery photos={await getGalleryPhotos()} />
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
