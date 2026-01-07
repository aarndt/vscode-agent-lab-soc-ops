import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { ModeSelectScreen } from './components/ModeSelectScreen';
import { GameScreen } from './components/GameScreen';
import { ScavengerScreen } from './components/ScavengerScreen';
import { BingoModal } from './components/BingoModal';
import { ScavengerCompleteModal } from './components/ScavengerCompleteModal';

function App() {
  const {
    gameState,
    gameMode,
    board,
    winningSquareIds,
    showBingoModal,
    scavengerList,
    scavengerProgress,
    showScavengerCompleteModal,
    showModeSelect,
    handleSquareClick,
    resetGame,
    dismissModal,
    selectMode,
    toggleScavengerItem,
    dismissScavengerModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStart={showModeSelect} />;
  }

  if (gameState === 'mode-select') {
    return <ModeSelectScreen onSelectMode={selectMode} />;
  }

  const isScavengerMode = (gameState === 'playing' && gameMode === 'scavenger') || gameState === 'scavenger-complete';
  
  if (isScavengerMode) {
    return (
      <>
        <ScavengerScreen
          list={scavengerList}
          progress={scavengerProgress}
          onToggleItem={toggleScavengerItem}
          onReset={resetGame}
        />
        {showScavengerCompleteModal && (
          <ScavengerCompleteModal onDismiss={dismissScavengerModal} />
        )}
      </>
    );
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
