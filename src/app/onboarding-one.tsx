import { router } from 'expo-router';
import OnboardingSlide from '../components/OnboardingSlide';

export default function OnboardingOneScreen() {
  return (
    <OnboardingSlide
      illustration="favorites"
      title="Все ваши любимые блюда"
      text="Все ваши любимые блюда в одном месте: вы делаете заказ, а всё остальное — наша забота"
      step={0}
      buttonTitle="Далее"
      onNext={() => router.push('/onboarding-two')}
    />
  );
}
