module EffectPrograms.ReaderT where

import Prelude
import Control.Monad.Reader.Trans (ReaderT, runReaderT)
import Effect (Effect)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Console as Console

-- Domain
helloWorldProgramReaderT ::
  forall m.
  LogToScreen m =>
  m Unit
helloWorldProgramReaderT = do
  logToScreen "Hello world"

class
  (Monad m) <= LogToScreen m where
  logToScreen :: String -> m Unit

-- API
newtype AppM a
  = AppM (ReaderT Unit Effect a)

runAppM :: AppM ~> Effect
runAppM (AppM m) = runReaderT m unit

-- Instances
instance LogToScreen AppM where
    logToScreen :: String -> AppM Unit
    logToScreen message = liftEffect $ Console.log message

-- boilerplate instances for AppM
derive newtype instance Functor AppM
derive newtype instance Applicative AppM
derive newtype instance Apply AppM
derive newtype instance Bind AppM
derive newtype instance Monad AppM


-- This enables liftEffect to be used in AppM context
derive newtype instance MonadEffect AppM
