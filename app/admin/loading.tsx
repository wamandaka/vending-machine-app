import PageContainer from "@/components/PageContainer";

export default function Loading() {
  return (
    <PageContainer>
      <p className="text-sm text-muted-foreground flex items-center justify-center h-screen">
        Loading products...
      </p>
    </PageContainer>
  );
}
