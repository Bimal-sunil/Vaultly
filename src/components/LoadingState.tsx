function LoadingState() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center gap-6 py-8 mt-2">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse" />

      <div className="w-full border border-light/5 bg-[linear-gradient(145deg,rgba(51,51,51,0.2)_0%,rgba(27,27,27,0.4)_100%)] backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center gap-6 shadow-xl relative overflow-hidden group">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-accent/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
          <div className="w-2 h-2 bg-light rounded-full animate-pulse"></div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-xl font-bold tracking-tight bg-linear-to-br from-accent via-light to-accent/50 bg-clip-text text-transparent select-none animate-pulse">
            Syncing Vault...
          </h3>
          <p className="small text-accent-bg opacity-75">
            Retrieving your active subscriptions
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingState;
