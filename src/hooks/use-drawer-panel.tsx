import { useMemo } from 'react';
import { IconType } from 'react-icons/lib';
import { AiOutlineMenu } from 'react-icons/ai';
import { Drawer, Tooltip } from 'antd';

import { tuple } from 'utils';
import { useTrigger } from 'hooks';

export interface IDrawerPanelHelpers {
  isVisible: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

export interface IUseDrawerPanel {
  tooltip?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  Icon?: IconType;
  Content:
  | JSX.Element
  | ((helpers?: IDrawerPanelHelpers) => JSX.Element);
}

export const useDrawerPanel = ({ tooltip, placement, Icon = AiOutlineMenu, Content }: IUseDrawerPanel) => {
  const [isVisible, { onHandler, offHandler }] = useTrigger();

  const panel = useMemo(
    () => (
      <Drawer
        placement={placement ?? 'right'}
        // disableBackdropClickHandler={false}
        // disableEscapePressHandler={false}
        open={isVisible}
        onClose={offHandler}
        key="right"
        style={{ overflowY: 'hidden' }}
      >
        {typeof Content === 'function' ? Content({ isVisible, onOpen: onHandler, onClose: offHandler }) : Content}
      </Drawer>
    ),
    [Content, isVisible, offHandler, onHandler, placement],
  );

  const button = useMemo(
    () => tooltip && tooltip.length > 0 ? (
      <Tooltip title = {tooltip}>
        <Icon
          style={{
            fontSize: '22px',
            verticalAlign: 'middle',
            textAlign: 'center',
            marginLeft: '-2px',
            cursor: 'pointer',
          }}
          onClick={() => onHandler()}
        />
      </Tooltip>
    ) : (
      <Icon
        style={{
          fontSize: '22px',
          verticalAlign: 'middle',
          textAlign: 'center',
          marginLeft: '-2px',
          cursor: 'pointer',
        }}
        onClick={() => onHandler()}
      />
    ), [Icon, onHandler, tooltip]);

  return tuple(button, panel, isVisible, offHandler);
};
