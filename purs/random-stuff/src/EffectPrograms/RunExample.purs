module EffectPrograms.RunExample where

import Prelude

import Data.Functor.Variant (case_, on)
import Effect (Effect)
import Effect.Console as Console
import Run (Run, case_, interpret, lift)
import Type.Proxy (Proxy(..))
import Type.Row (type (+))

-- Domain
helloWorldProgramRun ::
  forall r.
  Run
    (LOG_TO_SCREEN + r)
    Unit
helloWorldProgramRun = do logToScreen "Hello World!"

-- declare capabilities
data LogToScreen a
  = LogToScreen String a
derive instance Functor LogToScreen

_logToScreen :: Proxy "logToScreen"
_logToScreen = Proxy

type LOG_TO_SCREEN r = (logToScreen :: LogToScreen | r)

logToScreen :: forall r. String -> Run (LOG_TO_SCREEN + r) Unit
logToScreen msg = lift _logToScreen $ LogToScreen msg unit

-- API

logToScreenToEffect :: LogToScreen ~> Effect
logToScreenToEffect (LogToScreen msg next) = do
    Console.log msg
    pure next

-- Intrepreter
runProgram :: Run (LOG_TO_SCREEN
                    + ()
                    )
              ~> Effect
runProgram p =
    p # interpret (
        case_
            # on _logToScreen logToScreenToEffect
    )
