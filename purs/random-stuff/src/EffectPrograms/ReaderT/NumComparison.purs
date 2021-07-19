module EffectPrograms.ReaderT.NumComparison where

import Prelude

import Control.Monad.Reader.Class (class MonadAsk, asks)
import Control.Monad.Reader.Trans (ReaderT, runReaderT)
import Effect (Effect)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Console as Console
import Effect.Random (randomInt)
import Type.Equality (class TypeEquals, from)

-- Core: domain specific concepts
newtype HardCodedInt
  = HardCodedInt Int

-- Domain: define business logic as one pure function (program)
comparisonProgram :: forall m.
                    LogToScreen m =>
                    GenerateRandomInt m =>
                    MonadAsk Environment m =>
                    m Unit
comparisonProgram = do
  randomInt <- generateRandomInt

  (HardCodedInt hardInt) <- asks \envRecord -> envRecord.hardCodedInt

  let comparisonResult = case compare hardInt randomInt of
        LT -> " < "
        GT -> " > "
        EQ -> " = "

  let message = show hardInt <> comparisonResult <> show randomInt
  logToScreen message


-- Environment
type Environment
  = { hardCodedInt :: HardCodedInt }

-- declare capabilities as type classes
class
  (Monad m) <= LogToScreen m where
  logToScreen :: String -> m Unit

class
  (Monad m) <= GenerateRandomInt m where
  generateRandomInt :: m Int

-- API
newtype AppM a
  = AppM (ReaderT Environment Effect a)

runAppM :: Environment -> AppM ~> Effect
runAppM env (AppM m) = runReaderT m env

instance TypeEquals e Environment => MonadAsk e AppM where
    ask = AppM $ asks from

instance LogToScreen AppM where
    logToScreen :: String -> AppM Unit
    logToScreen msg = liftEffect $ Console.log msg

instance GenerateRandomInt AppM where
    generateRandomInt :: AppM Int
    generateRandomInt = liftEffect $ randomInt bottom top

-- instances for AppM
derive newtype instance Functor AppM
derive newtype instance Apply AppM
derive newtype instance Applicative AppM
derive newtype instance Bind AppM
derive newtype instance Monad AppM
derive newtype instance MonadEffect AppM
