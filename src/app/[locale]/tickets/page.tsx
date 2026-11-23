import { gardenTopicRoute } from '@/lib/garden-topic-route';

const route = gardenTopicRoute('tickets');
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
