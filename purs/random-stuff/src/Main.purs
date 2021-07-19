module Main where

import Data.List
import Data.Foldable (sum)
import Effect (Effect)
import Effect.Console (log)
import Prelude (Unit, ($), (<<<), (==), mod, show)
import EffectPrograms.ReaderT (helloWorldProgramReaderT, runAppM)
import EffectPrograms.RunExample (helloWorldProgramRun, runProgram)

myFunc :: List Int -> Int
myFunc = sum <<< filter (\x -> x `mod` 2 == 0)

main :: Effect Unit
main = do
  --runAppM helloWorldProgramReaderT
  runProgram helloWorldProgramRun
