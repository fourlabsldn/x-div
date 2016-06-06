import registerXDiv from './registerXDiv';
import xController from './xController';
import xDivTester from './xDivTester';

registerXDiv();

// Expose xController for xDiv modules
export default {
  xDivTester,
  xController,
};
