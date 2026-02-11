'use client';

import { BRANDING_EMAIL, SOCIAL_URL } from '@lobechat/business-const';
import { useAnalytics } from '@lobehub/analytics/react';
import { type MenuProps } from '@lobehub/ui';
import { ActionIcon, DropdownMenu, Flexbox, Icon } from '@lobehub/ui';
import { DiscordIcon } from '@lobehub/ui/icons';
import {
  CircleHelp,
  FlaskConical,
} from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
      <Flexbox horizontal align={'center'} gap={2} justify={'space-between'} padding={8}>
        <Flexbox horizontal align={'center'} flex={1} gap={2}>
          <DropdownMenu items={helpMenuItems} placement="topLeft">
            <ActionIcon aria-label={t('userPanel.help')} icon={CircleHelp} size={16} />
          </DropdownMenu>
        </Flexbox>
        <ThemeButton placement={'topCenter'} size={16} />
      </Flexbox>
      <LabsModal open={isLabsModalOpen} onClose={handleCloseLabsModal} />
    </>
  );
});

export default Footer;
