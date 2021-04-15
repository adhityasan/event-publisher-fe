export const emitAuthentication = (token: string): void => {
  if (token) {
    window.socket.emit(
      'create',
      'authentication',
      {
        strategy: 'jwt',
        accessToken: token
      },
      (error: any) => {
        if (error) throw error;
      }
    );
  }
};
