<?php

namespace craft\conditions\elements\users;

use Craft;
use craft\conditions\elements\ElementQueryCondition;

/**
 * User query condition.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 4.0.0
 */
class UserQueryCondition extends ElementQueryCondition
{
    /**
     * @inheritdoc
     */
    protected function conditionRuleTypes(): array
    {
        $types = array_merge(parent::conditionRuleTypes(), [
            AdminConditionRule::class,
            CredentialedConditionRule::class,
            EmailConditionRule::class,
            FirstNameConditionRule::class,
            GroupConditionRule::class,
            LastLoginDateConditionRule::class,
            LastNameConditionRule::class,
        ]);

        if (!Craft::$app->getConfig()->getGeneral()->useEmailAsUsername) {
            $types[] = UsernameConditionRule::class;
        }

        return $types;
    }
}
