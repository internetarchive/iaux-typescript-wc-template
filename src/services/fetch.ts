/* eslint-disable */
// import { sentryLogs } from '../../config/sentry-events.js';

/**
 * Helper to call loan service
 * @param {Object} options
 */
export default async function ActionsHandlerService(options: any) {
  const option = {
    action: null,
    identifier: '',
    success() {},
    error() {},
    ...options,
  };

  let baseHost = '/services/loans/loan';
  const location = window?.location;

  // return error reponse when not production and has ?error=true param...
  const tokenError = 'loan token not found. please try again later.';
  const emailAvailableError = 'email is not availabe right now!';
  const erroneousActions = ['email_available', 'borrow_book', 'create_token'];
  const shouldReturnError =
    location?.href?.indexOf('?error=true') !== -1 &&
    location?.hostname !== 'archive.org';

  if (location?.pathname === '/demo') baseHost = `/demo/`;

  let response = {};
  let formData = new FormData();
  formData.append('action', option.action);
  formData.append('identifier', option.identifier);
  try {
    await fetch(baseHost, {
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        // intentional error on localhost
        if (shouldReturnError && erroneousActions.includes(option?.action)) {
          console.log('error');
          return {
            success: false,
            error:
              option?.action === 'create_token'
                ? tokenError
                : emailAvailableError,
          };
        }

        // return success response for /demo/ server...
        if (baseHost == '/demo/1' || baseHost == '/demo') {
          return {
            success: true,
            message: 'operation executed successfully!',
          };
        }

        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return await response.json();
      })
      .then(data => {
        response = data;
        console.log(response);
      });
  } catch (error) {
    // window?.Sentry?.captureException(
    //   `${sentryLogs.actionsHandlerService} - Error: ${error}`
    // );
  }

  return response;
}
