import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';

/**
 */
export class WorkspaceExport extends Component {
  /**
   * @private
   */
  exportableState() {
    const { state } = this.props;
    const {
      companionWindows,
      config,
      elasticLayout,
      viewers,
      windows,
      workspace,
    } = state;

    return JSON.stringify({
      companionWindows,
      config,
      elasticLayout,
      viewers,
      windows,
      workspace,
    }, null, 2);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      children, container, handleClose, open, t,
    } = this.props;
    const exportableState = this.exportableState();
    return (
      <Dialog
        id="workspace-settings"
        container={container}
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" disableTypography>
          <Typography variant="h2">{t('downloadExport')}</Typography>
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          {children}
          <pre>
            {exportableState}
          </pre>
        </ScrollIndicatedDialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>{t('cancel')}</Button>
          <CopyToClipboard
            text={exportableState}
          >
            <Button variant="contained" color="primary">{t('copy')}</Button>
          </CopyToClipboard>
        </DialogActions>
      </Dialog>
    );
  }
}

WorkspaceExport.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceExport.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
