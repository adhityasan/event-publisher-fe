export const emitAuthentication = (accessToken: string): void => {
  if (accessToken) {
    window.socket.emit(
      'create',
      'authentication',
      {
        strategy: 'jwt',
        accessToken: accessToken
      },
      (error: any) => {
        if (error) throw error;
      }
    );
  }
};
