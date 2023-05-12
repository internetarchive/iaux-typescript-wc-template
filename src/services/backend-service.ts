/* eslint-disable */

/**
 * Helper to call loan service
 * @param {Object} options
 */
export async function BackendServiceHandler(options: any) {
  const option = {
    action: null,
    identifier: '',
    ...options,
  };

  let baseHost = `http://localhost/index.php?submit=1&identifier=${
    option.identifier
  },
  &fname=${encodeURIComponent('hello-world.jpg')}`;

  const location = window?.location;

  if (location?.pathname === '/demo/') baseHost = `/demo/`;

  let response = {};
  let formData = new FormData();
  formData.append('action', option.action);
  formData.append('identifier', option.identifier);
  formData.append('identifier', option.identifier);

  try {
    await fetch(baseHost, {
      mode: 'no-cors',
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        /**
         * return success response for /demo/ server...
         */
        if (option.action === 'screenname-available1') {
          return {
            status: false,
            error: 'This screen name is already being used by another user.',
          };
        }

        /**
         * return success response for /demo/ server...
         */
        // if (baseHost == '/demo/1' || baseHost == '/demo/') {
        //   return { status: true, message: 'data has been saved!' };
        // }

        /**
         * The response is a Response instance.
         * You parse the data into a useable format using `.json()`
         */
        return await response.json();
      })
      .then(async data => {
        response = data;
      });
  } catch (error) {}

  return response;
}