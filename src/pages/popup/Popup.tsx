/* eslint-disable jsx-a11y/label-has-associated-control */
import yotubeIcon from '@assets/img/icons8-youtube.svg';
import vkIcon from '@assets/img/icons8-vk.svg';
import '@pages/popup/Popup.css';
import '@src/shared/styles/base.css';
import useStorage from '@src/shared/hooks/useStorage';
import restrictionsStorage, { Application } from '@src/shared/storages/restrictions';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Flex } from '@root/src/components';
import { Entries } from '@root/src/shared/types/entries';

const appIconMap = {
  vk: vkIcon,
  youtube: yotubeIcon,
} as const satisfies Record<Application, string>;

const Popup = () => {
  const restrictions = useStorage(restrictionsStorage);

  return (
    <main className="App">
      {(Object.entries(restrictions) as Entries<typeof restrictions>).map(([key, value]) => {
        return (
          <label key={key} htmlFor={key} className="app-label">
            <Flex justifyContent="space-between">
              <Flex justifyContent="space-between" gap="1rem">
                <img src={appIconMap[key]} className="app-logo" alt={`logo-${key}`} />
                {key}
              </Flex>
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => restrictionsStorage.update({ [key]: !value })}
              />
            </Flex>
          </label>
        );
      })}
    </main>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
