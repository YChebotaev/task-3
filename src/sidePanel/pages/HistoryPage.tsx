import { type FC } from "react";
import { BaseLayout } from "../layouts/BaseLayout";
import { HistoryList } from "../components/HistoryList";
import { AwaitIncoming } from "../components/AwaitIncoming";

export const HistoryPage: FC = () => {
  return (
    <BaseLayout>
      <HistoryList />
      <AwaitIncoming />
    </BaseLayout>
  );
};
