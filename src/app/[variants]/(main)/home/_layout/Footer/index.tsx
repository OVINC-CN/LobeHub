'use client';

import { ActionIcon, DropdownMenu, Icon, type MenuProps } from '@lobehub/ui';
import { Flexbox } from '@lobehub/ui';
import {
  CircleHelp,
  FlaskConical,
} from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LabsModal from '@/components/LabsModal';
import ThemeButton from '@/features/User/UserPanel/ThemeButton';

const Footer = memo(() => {
  const { t } = useTranslation('common');
  const [isLabsModalOpen, setIsLabsModalOpen] = useState(false);

  const handleOpenLabsModal = () => {
    setIsLabsModalOpen(true);
  };

  const handleCloseLabsModal = () => {
    setIsLabsModalOpen(false);
  };

  const helpMenuItems: MenuProps['items'] = useMemo(
    () => [
      {
        icon: <Icon icon={FlaskConical} />,
        key: 'labs',
        label: t('labs'),
        onClick: handleOpenLabsModal,
      },
    ],
    [t],
  );

  return (
    <>
      <Flexbox align={'center'} gap={2} horizontal justify={'space-between'} padding={8}>
        <Flexbox align={'center'} flex={1} gap={2} horizontal>
          <DropdownMenu items={helpMenuItems} placement="topLeft">
            <ActionIcon aria-label={t('userPanel.help')} icon={CircleHelp} size={16} />
          </DropdownMenu>
        </Flexbox>
        <ThemeButton placement={'topCenter'} size={16} />
      </Flexbox>
      <LabsModal onClose={handleCloseLabsModal} open={isLabsModalOpen} />
    </>
  );
});

export default Footer;
