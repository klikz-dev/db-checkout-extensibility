import {
  Banner,
  reactExtension,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension('purchase.checkout.block.render', () => (
  <Extension />
));

function Extension() {
  const { title, description, collapsible, status } = useSettings();

  if (title && status) {
    return (
      <Banner title={title} status={status} collapsible={collapsible}>
        {description}
      </Banner>
    );
  }

  return null;
}
