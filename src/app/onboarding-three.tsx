import { router } from 'expo-router';
import OnboardingSlide from '../components/OnboardingSlide';

export default function OnboardingThreeScreen() {
  return (
    <OnboardingSlide
      illustration="delivery"
      title="Бесплатная доставка"
      text="Все ваши любимые блюда в одном месте: вы делаете заказ, а всё остальное — наша забота"
      step={2}
      buttonTitle="Начать"
      onNext={() => router.replace('/login')}
      showSkip={false}
    />
  );
}
