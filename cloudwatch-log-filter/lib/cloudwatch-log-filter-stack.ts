import { Stack, StackProps } from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import * as logs from 'aws-cdk-lib/aws-logs'
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import { join } from 'path'; 

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CloudwatchLogFilterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const scheduledFunction = new NodejsFunction(this,"ScheduledLambdaFunction",{
      runtime:Runtime.NODEJS_14_X,
      memorySize:512,
      entry:(join(__dirname,'../src/cronjob.ts')),
      handler:'handler',
      logRetention: logs.RetentionDays.THREE_DAYS
    });

    const cronRule = new Rule(this,'CronRule',{
      schedule:Schedule.expression('cron(0/5 * * * ? *)')
    });

    cronRule.addTarget(new LambdaFunction(scheduledFunction));
  }
}
