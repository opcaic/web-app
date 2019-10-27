import {
  tournamentFormatEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { Tag } from 'antd';
import React from 'react';

export function getFooterTags(tournament, updateFilter) {
  const footerTags = [];

  footerTags.push({
    key: 'scope',
    onClick: () => updateFilter({ scope: tournament.scope }),
    text: tournamentScopeEnum.helpers.idToText(tournament.scope).toLowerCase(),
  });

  const formatText = tournamentFormatEnum.helpers.idToText(tournament.format);
  footerTags.push({
    key: 'format',
    onClick: () => updateFilter({ format: tournament.format }),
    text:
      tournament.format === tournamentFormatEnum.ELO
        ? formatText
        : formatText.toLowerCase(),
  });

  if (updateFilter) {
    return footerTags.map(x => (
      <Tag key={x.key} onClick={x.onClick} style={{ cursor: 'pointer' }}>
        {x.text}
      </Tag>
    ));
  }

  return footerTags.map(x => <Tag key={x.key}>{x.text}</Tag>);
}
