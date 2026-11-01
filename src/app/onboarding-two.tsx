import { router } from 'expo-router';
import OnboardingSlide from '../components/OnboardingSlide';

export default function OnboardingTwoScreen() {
  return (
    <OnboardingSlide
      illustration="chef"
      title="Заказ от выбранного шефа"
      text="Все ваши любимые блюда в одном месте: вы делаете заказ, а всё остальное — наша забота"
      step={1}
      buttonTitle="Далее"
      onNext={() => router.push('/onboarding-three')}
    />
  );
}
