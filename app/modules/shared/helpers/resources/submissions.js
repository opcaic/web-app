import { submissionValidationStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { theme } from '@/modules/shared/helpers/utils';

export function getValidationStateColor(validationState) {
  switch (validationState) {
    case submissionValidationStateEnum.QUEUED:
      return theme.DANGER_COLOR;
    case submissionValidationStateEnum.VALID:
      return theme.SUCCESS_COLOR;
    case submissionValidationStateEnum.INVALID:
      return theme.ERROR_COLOR;
    case submissionValidationStateEnum.ERROR:
      return theme.ERROR_COLOR;
    default:
      return null;
  }
}
