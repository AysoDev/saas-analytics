import { 
  CardProps, 
  CardHeaderProps, 
  CardContentProps, 
  CardFooterProps, 
  CardTitleProps, 
  CardDescriptionProps 
} from './Types'
import './Main.css'

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  )
}

const CardContent = ({ children, className = '' }: CardContentProps) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return (
    <h3 className={`card-title ${className}`}>
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className = '' }: CardDescriptionProps) => {
  return (
    <p className={`card-description ${className}`}>
      {children}
    </p>
  )
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription

export { Card }