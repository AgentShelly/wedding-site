import { getAlbumSnapshot } from "@/lib/photo-store";

export const dynamic = "force-static";

export function GET() {
  const snapshot = getAlbumSnapshot();
  return Response.json({
    schemaVersion: 1,
    releaseId: process.env.RELEASE_ID ?? "local",
    environment: process.env.RELEASE_ENVIRONMENT ?? "local",
    projectId: process.env.VERCEL_PROJECT_ID ?? "local",
    commit: process.env.GIT_COMMIT ?? "unknown",
    manifestCapturedAt: snapshot.capturedAt,
    manifestDigest: snapshot.digest,
    photoCount: snapshot.count,
  });
}
