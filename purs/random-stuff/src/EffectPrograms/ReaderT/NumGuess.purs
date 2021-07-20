module NumGuess where

import Prelude

import Control.Monad.Reader (ReaderT, runReaderT)
import Data.Either (Either(..))
import Effect (Effect)
import Effect.Aff (Aff, makeAff, nonCanceler, runAff_)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Console (log)
import Effect.Random (randomInt)
import Node.ReadLine (Interface, close, createConsoleInterface, noCompletion)
import Node.ReadLine as Readline

type Env
  = { randomNumber :: Int }

class
  (Monad m) <= Teletype m where
  putStrLn :: String -> m Unit
  readLine :: m Unit

class
  (Monad m) <= Random m where
  randInt :: Int -> Int -> m Int

newtype AppM a
  = AppM (ReaderT Unit Effect a)

runAppM :: AppM ~> Effect
runAppM (AppM m) = runReaderT m unit


instance Random AppM where
    randInt :: Int -> Int -> AppM Int
    randInt bottom top = liftEffect $ randomInt bottom top

instance Teletype AppM where
    putStrLn :: String -> AppM Unit
    putStrLn msg = liftEffect $ log msg
    readLine :: AppM Unit
    readLine = liftEffect $ do
        interface <- createConsoleInterface noCompletion
        runAff_
            (\_ -> closeInterface interface)
            (useInterface interface)
        where
            closeInterface :: Interface -> Effect Unit
            closeInterface interface = do
                close interface
            useInterface :: Interface -> Aff Unit
            useInterface interface = do
                guess <- interface # question "Guess a number"
                pure unit
            question :: String -> Interface -> Aff String
            question message interface = makeAff go
                where
                    go runAffFunction = nonCanceler <$
                        Readline.question message (runAffFunction <<< Right) interface


derive newtype instance Functor AppM
derive newtype instance Apply AppM
derive newtype instance Applicative AppM
derive newtype instance Bind AppM
derive newtype instance Monad AppM
derive newtype instance MonadEffect AppM