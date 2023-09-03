using System.Reflection;

public class CustomMapper
{
    public static TTarget Map<TSource, TTarget>(TSource source)
        where TTarget : new()
    {
        if (source == null)
            return default;

        TTarget target = new TTarget();

        Type sourceType = typeof(TSource);
        Type targetType = typeof(TTarget);

        PropertyInfo[] sourceProperties = sourceType.GetProperties();
        PropertyInfo[] targetProperties = targetType.GetProperties();

        foreach (var sourceProp in sourceProperties)
        {
            PropertyInfo targetProp = Array.Find(targetProperties, p =>
                p.Name.Equals(sourceProp.Name, StringComparison.OrdinalIgnoreCase)
                && p.PropertyType == sourceProp.PropertyType);

            if (targetProp != null && targetProp.CanWrite)
            {
                object value = sourceProp.GetValue(source);
                targetProp.SetValue(target, value);
            }
        }

        return target;
    }

    public static List<TTarget> ListMap<TSource, TTarget>(IEnumerable<TSource> sourceList)
        where TTarget : new()
    {
        List<TTarget> targetList = new List<TTarget>();

        foreach (var sourceItem in sourceList)
        {
            TTarget targetItem = Map<TSource, TTarget>(sourceItem);
            targetList.Add(targetItem);
        }

        return targetList;
    }

    public static void UpdatePropreties<TSource, TTarget>(TSource source, TTarget target)
    {
        if (source == null || target == null)
            return;

        Type sourceType = typeof(TSource);
        Type targetType = typeof(TTarget);

        PropertyInfo[] sourceProperties = sourceType.GetProperties();
        PropertyInfo[] targetProperties = targetType.GetProperties();

        foreach (var sourceProp in sourceProperties)
        {
            PropertyInfo targetProp = Array.Find(targetProperties, p =>
                p.Name.Equals(sourceProp.Name, StringComparison.OrdinalIgnoreCase)
                && p.PropertyType == sourceProp.PropertyType);

            if (targetProp != null && targetProp.CanWrite)
            {
                object value = sourceProp.GetValue(source);
                targetProp.SetValue(target, value);
            }
        }
    }


    public static void ListUpdatePropreties<TSource, TTarget>(IEnumerable<TSource> sourceList)
        where TTarget : new()
    {
        foreach (var sourceItem in sourceList)
        {
            UpdatePropreties(sourceItem, sourceItem);
        }
    }
}